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

  getClaims() {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const payload = token.split(".")[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  }

  getUserID(): string | null {
    const claims = this.getClaims();
    if (!claims) {
      return null;
    }
    return (
      claims[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ] || null
    );
  }

  getUserRole(): string[] | null {
    const claims = this.getClaims();
    if (!claims) {
      return null;
    }
    return (
      claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
      null
    );
  }

  isAdmin(): boolean {
    const roles = this.getUserRole();

    if (!roles) {
      return false;
    }
    return roles.includes("Admin");
  }
}

export const tokenService = new TokenService();
