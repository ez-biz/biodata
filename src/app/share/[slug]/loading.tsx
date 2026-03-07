export default function ShareLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gold-50/30 to-white">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-4 border-maroon-200 border-t-maroon-600 animate-spin mx-auto mb-4" />
        <p className="text-sm text-muted-foreground">Loading biodata...</p>
      </div>
    </div>
  );
}
