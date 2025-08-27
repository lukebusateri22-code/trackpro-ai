import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.trackpro.ai',
  appName: 'TrackPro AI',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#1a1a2e',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#00d4ff',
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: 'launch_screen',
      useDialog: true
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    },
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#00d4ff',
      sound: 'beep.wav'
    },
    Camera: {
      permissions: {
        camera: 'This app needs access to camera to record training videos.',
        photos: 'This app needs access to photo library to select training videos.'
      }
    },
    Device: {
      iosCustomApplicationProtocol: 'trackpro'
    }
  },
  ios: {
    scheme: 'TrackPro AI',
    contentInset: 'automatic'
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
      keystoreAliasPassword: undefined,
      keystorePassword: undefined,
      releaseType: 'AAB',
      signingType: 'apksigner'
    }
  }
};

export default config;
