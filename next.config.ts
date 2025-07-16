/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // ATENÇÃO: O wildcard '**' permite QUALQUER hostname.
        // Use com extrema cautela devido aos riscos de segurança e custos.
        hostname: '**',
      },
       {
        // É uma boa prática permitir http também, se necessário,
        // mas https é sempre preferível.
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;