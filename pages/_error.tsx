// pages/_error.tsx
import React from 'react';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';

interface ErrorProps {
  statusCode: number;
}

const Error = ({ statusCode }: ErrorProps) => {
  const router = useRouter();

  // Leitet zur Login-Seite weiter, wenn ein bestimmter Fehlercode vorliegt (z.B. 401)
  React.useEffect(() => {
    if (statusCode === 401) {
      router.push('/auth');
    }
  }, [statusCode, router]);

  return (
    <div>
      <h1>{statusCode ? `Error ${statusCode}` : 'An unexpected error has occurred'}</h1>
      <p>
        {statusCode === 404 ? 'Page not found' : 'Something went wrong. Please try again later.'}
      </p>
    </div>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext): ErrorProps => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 404;
  return { statusCode };
};

export default Error;

// import React from 'react';
// import { NextPageContext } from 'next';

// // Definiere die Typen für die Props
// interface ErrorProps {
//   statusCode: number;
// }

// const Error = ({ statusCode }: ErrorProps) => {
//   return (
//     <div>
//       <h1>{statusCode ? `Error ${statusCode}` : 'An unexpected error has occurred'}</h1>
//       <p>
//         {statusCode === 404 ? 'Page not found' : 'Something went wrong. Please try again later.'}
//       </p>
//     </div>
//   );
// };

// Error.getInitialProps = ({ res, err }: NextPageContext): ErrorProps => {
//   const statusCode = res?.statusCode ?? err?.statusCode ?? 404;
//   return { statusCode };
// };

// export default Error;
