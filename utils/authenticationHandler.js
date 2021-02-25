import {authorize, refresh} from 'react-native-app-auth';

class AuthenticationHandler {
  constructor() {
    this.spotifyAuthConfig = {
      clientId: '3abceea2d1f04eaf91b4bf4af39bd4a7',
      clientSecret: 'caf6b1c6d3df4a828c1558331d3cd9fb',
      redirectUrl: 'net.spotify.test:/oauth2redirect',
      scopes: [
        'playlist-read-private',
        'playlist-modify-public',
        'playlist-modify-private',
        'user-library-read',
        'user-library-modify',
        'user-top-read',
      ],
      serviceConfiguration: {
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        tokenEndpoint: 'https://accounts.spotify.com/api/token',
      },
    };
  }

  async onLogin() {
    try {
      const result = await authorize(this.spotifyAuthConfig);

      return result;
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }

  async refreshLogin(refreshToken) {
    const result = await refresh(this.spotifyAuthConfig, {
      refreshToken: refreshToken,
    });
    return result;
  }
}

const authHandler = new AuthenticationHandler();

export default authHandler;
