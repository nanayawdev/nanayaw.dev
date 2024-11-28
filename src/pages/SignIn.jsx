import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

export default function SignIn() {
  const navigate = useNavigate();
  
  const handleSignIn = async (credentials) => {
    try {
      const { error } = await supabase.auth.signInWithPassword(credentials);
      if (error) throw error;
      
      toast.success("Signed in successfully");
      // Navigate to homepage instead of admin
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ... rest of the component
} 