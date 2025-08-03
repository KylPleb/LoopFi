export interface User {
  id: string;
  name: string;
  roleId: string;
}

export interface Role {
  id: string;
  name: string;
}

export interface Loop {
  id: string;
  title: string;
  vaultId: string;
}

export interface Vote {
  id: string;
  loopId: string;
  userId: string;
  weight: number;
}

export interface Vault {
  id: string;
  balance: string;
}
