type LoginRequest = {
	email: string;
	password: string;
};

type UserProfile = {
	userAvatar: string;
	userBio: string;
	userEmail: string;
	userUsername: string;
};

export type { LoginRequest, UserProfile };
