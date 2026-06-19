import { useState, useEffect } from "react";
import { useParams, Outlet } from "react-router";
import { Loader2 } from "lucide-react";
import NotFound from "../pages/NotFound";

export default function AdminGuard() {
  const { adminPath } = useParams<{ adminPath: string }>();
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyRoute = async () => {
      try {
        const res = await fetch("/api/admin/verify-route", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ adminPath }),
        });
        
        if (res.ok) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch (err) {
        console.error("Route verification failed", err);
        setIsValid(false);
      }
    };

    if (adminPath) {
      verifyRoute();
    } else {
      setIsValid(false);
    }
  }, [adminPath]);

  if (isValid === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F3F5F7]">
        <Loader2 className="w-8 h-8 animate-spin text-[#5B6E82]" />
      </div>
    );
  }

  if (isValid === false) {
    return <NotFound />;
  }

  return <Outlet />;
}
