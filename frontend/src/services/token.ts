const keyToken = "token";

class TokenService {
  saveToken(token: string): void {
    localStorage.setItem(keyToken, token);
  }
  getToken(): string | null {
    return localStorage.getItem(keyToken);
  }

  removeToken(): void {
    localStorage.removeItem(keyToken);
  }
}

export const tokenService = new TokenService();
