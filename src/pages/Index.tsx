import { Button } from "@/components/ui/button";
import { Bot, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary/30 px-4">
      <div className="text-center max-w-2xl animate-fade-in">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center">
            <Bot className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Omam Consultants
        </h1>
        <p className="text-xl text-muted-foreground mb-2">
          AI-Powered Recruiting Platform
        </p>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Streamline your recruiting process with intelligent automation, 
          candidate tracking, and seamless client management.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/login">
            <Button size="lg" className="gap-2 px-8">
              Sign In
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="lg" variant="outline" className="px-8">
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
