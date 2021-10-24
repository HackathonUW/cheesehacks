import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router-dom";

function AuthenticatedPage({ children }) {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Redirect to='/' />
  }
  
  return (
    <div>
      {children}
    </div>
  );
}

export default AuthenticatedPage;