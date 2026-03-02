"use client";

import { useCallback, useRef, useState } from "react";
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useBiodataStore } from "@/lib/store/biodata-store";
import { Button } from "@/components/ui/button";
import { Camera, Crop as CropIcon, Trash2, Upload, X, Loader2 } from "lucide-react";

interface PhotoUploadProps {
  type: "profile" | "additional";
  index?: number;
  className?: string;
}

function centerAspectCrop(width: number, height: number, aspect: number) {
  return centerCrop(
    makeAspectCrop({ unit: "%", width: 80 }, aspect, width, height),
    width,
    height
  );
}

export function PhotoUpload({ type, index = 0, className = "" }: PhotoUploadProps) {
  const { profilePhotoUrl, setProfilePhoto, additionalPhotos, addAdditionalPhoto, removeAdditionalPhoto } = useBiodataStore();
  const [showCrop, setShowCrop] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState<Crop>();
  const [uploading, setUploading] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentUrl = type === "profile" ? profilePhotoUrl : additionalPhotos[index];

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImgSrc(reader.result as string);
      setShowCrop(true);
    };
    reader.readAsDataURL(file);

    // Reset input so same file can be re-selected
    e.target.value = "";
  }, []);

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const aspect = type === "profile" ? 3 / 4 : 1;
    setCrop(centerAspectCrop(width, height, aspect));
  }, [type]);

  const handleCropApply = useCallback(async () => {
    if (!imgRef.current || !crop) return;

    setUploading(true);

    try {
      // Create cropped canvas
      const image = imgRef.current;
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      const pixelCrop = {
        x: (crop.x / 100) * image.width * scaleX,
        y: (crop.y / 100) * image.height * scaleY,
        width: (crop.width / 100) * image.width * scaleX,
        height: (crop.height / 100) * image.height * scaleY,
      };

      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      // Convert to data URL (using data URL for local preview, S3 upload in production)
      const dataUrl = canvas.toDataURL("image/jpeg", 0.9);

      if (type === "profile") {
        setProfilePhoto(dataUrl);
      } else {
        addAdditionalPhoto(dataUrl);
      }

      setShowCrop(false);
      setImgSrc("");
    } catch (error) {
      console.error("Crop failed:", error);
    } finally {
      setUploading(false);
    }
  }, [crop, type, setProfilePhoto, addAdditionalPhoto]);

  const handleRemove = useCallback(() => {
    if (type === "profile") {
      setProfilePhoto(null);
    } else {
      removeAdditionalPhoto(index);
    }
  }, [type, index, setProfilePhoto, removeAdditionalPhoto]);

  return (
    <>
      <div className={`relative ${className}`}>
        {currentUrl ? (
          <div className="relative group">
            <img
              src={currentUrl}
              alt={type === "profile" ? "Profile photo" : `Photo ${index + 1}`}
              className="w-full h-full object-cover rounded-lg border border-maroon-200"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
              <Button
                size="sm"
                variant="secondary"
                className="h-8 w-8 p-0 rounded-full"
                onClick={() => inputRef.current?.click()}
              >
                <Camera className="h-3.5 w-3.5" />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                className="h-8 w-8 p-0 rounded-full"
                onClick={handleRemove}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => inputRef.current?.click()}
            className="w-full h-full min-h-[120px] rounded-lg border-2 border-dashed border-maroon-200 hover:border-maroon-400 bg-maroon-50/30 hover:bg-maroon-50/60 transition-colors flex flex-col items-center justify-center gap-2 text-maroon-400"
          >
            <Upload className="h-6 w-6" />
            <span className="text-xs font-medium">
              {type === "profile" ? "Upload Photo" : "Add Photo"}
            </span>
            <span className="text-[10px] text-muted-foreground">
              JPG, PNG · Max 5MB
            </span>
          </button>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Crop Modal */}
      {showCrop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowCrop(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b">
              <div className="flex items-center gap-2">
                <CropIcon className="h-4 w-4 text-maroon-700" />
                <h3 className="font-display font-semibold text-maroon-900">
                  Crop Photo
                </h3>
              </div>
              <button
                onClick={() => setShowCrop(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 max-h-[60vh] overflow-auto flex items-center justify-center bg-gray-50">
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                aspect={type === "profile" ? 3 / 4 : undefined}
                minWidth={50}
              >
                <img
                  ref={imgRef}
                  src={imgSrc}
                  alt="Crop preview"
                  onLoad={onImageLoad}
                  className="max-h-[50vh]"
                />
              </ReactCrop>
            </div>

            <div className="flex justify-end gap-2 px-5 py-3 border-t">
              <Button
                variant="outline"
                onClick={() => setShowCrop(false)}
                className="rounded-full"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCropApply}
                disabled={uploading}
                className="rounded-full bg-maroon-800 hover:bg-maroon-700 text-gold-100 gap-2"
              >
                {uploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <CropIcon className="h-4 w-4" />
                )}
                Apply Crop
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
