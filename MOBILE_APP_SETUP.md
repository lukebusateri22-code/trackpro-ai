# TrackPro AI - Mobile App Setup Guide

## Converting to Mobile App with Capacitor

### Step 1: Install Capacitor
```bash
npm install @capacitor/core @capacitor/cli
npx cap init TrackPro com.trackpro.ai
```

### Step 2: Add Mobile Platforms
```bash
# For iOS
npm install @capacitor/ios
npx cap add ios

# For Android  
npm install @capacitor/android
npx cap add android
```

### Step 3: Build and Sync
```bash
npm run build
npx cap sync
```

### Step 4: Open in Native IDEs
```bash
# For iOS (requires Xcode on Mac)
npx cap open ios

# For Android (requires Android Studio)
npx cap open android
```

## Mobile-Specific Features to Add

### 1. Native Plugins
```bash
# Camera for video recording
npm install @capacitor/camera

# Device info
npm install @capacitor/device

# Haptic feedback
npm install @capacitor/haptics

# Status bar styling
npm install @capacitor/status-bar

# Splash screen
npm install @capacitor/splash-screen
```

### 2. PWA Features (Alternative)
Add to `public/manifest.json`:
```json
{
  "name": "TrackPro AI",
  "short_name": "TrackPro",
  "description": "AI-powered track and field analysis",
  "theme_color": "#000000",
  "background_color": "#ffffff",
  "display": "standalone",
  "orientation": "portrait",
  "scope": "/",
  "start_url": "/",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon-512.png", 
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

## App Store Requirements

### iOS App Store
1. Apple Developer Account ($99/year)
2. App icons (various sizes)
3. Screenshots for different devices
4. Privacy policy
5. App description and metadata

### Google Play Store
1. Google Play Developer Account ($25 one-time)
2. App icons and feature graphics
3. Screenshots
4. Privacy policy
5. App description and metadata

## Navigation Changes Made

✅ **Completed**: Converted from tab-based conditional rendering to proper page routing
- Each tab now navigates to a separate route/page
- No more scrolling within tabs - each page is independent
- Mobile app-like navigation experience
- Proper browser history support

### New Route Structure:
- `/` - Home Page
- `/training` - Training Page  
- `/recovery` - Recovery Page
- `/goals` - Goals Page
- `/profile` - Profile Page

## Next Steps

1. **Test the new navigation** - Each tab should now navigate to a new page
2. **Add mobile-specific styling** - Optimize for touch interactions
3. **Implement Capacitor** - Follow steps above to create native apps
4. **Add native features** - Camera, haptics, etc.
5. **Create app icons** - Design icons for both platforms
6. **Submit to app stores** - Follow platform guidelines

## Benefits of This Approach

- **Native feel**: Each screen is a separate page
- **Better performance**: Only loads content for current page
- **Proper navigation**: Back button works correctly
- **App store ready**: Structure supports native app conversion
- **SEO friendly**: Each page has its own URL (if deployed as web app)
