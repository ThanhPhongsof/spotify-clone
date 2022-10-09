import { GetServerSideProps } from "next";
import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import spotifyLogo from "../assets/spotify-logo.png";

interface LoginProps {
  providers: Awaited<ReturnType<typeof getProviders>>;
}

const Login = ({ providers }: LoginProps) => {
  const { id: providerId, name: providerName } =
    providers?.spotify as ClientSafeProvider;

  return (
    <div className="flex flex-col justify-center items-center bg-black h-screen">
      <div className="mb-6">
        <Image
          src={spotifyLogo}
          alt="Spotify Logo"
          width="200px"
          height="200px"
        />
      </div>
      <button
        className="bg-primary text-white p-5 rounded-full"
        onClick={() => {
          signIn(providerId, { callbackUrl: "/" });
        }}
      >
        Login with {providerName}
      </button>
    </div>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps<LoginProps> = async (
  context
) => {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};
