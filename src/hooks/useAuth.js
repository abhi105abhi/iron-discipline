import { useEffect } from 'react';
import { auth } from '../firebase';
import { useStore } from '../store/useStore';
import { FirebaseService } from '../services/firebaseService';

export const useAuth = () => {
  const { setUser, setPremium, setLoading } = useStore();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      setLoading(true);
      if (user) {
        let profile = await FirebaseService.getUserProfile(user.uid);
        if (!profile) {
          profile = await FirebaseService.createUserProfile(user);
        }
        setUser(user);
        setPremium(profile.isPremium);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsub;
  }, [setUser, setPremium, setLoading]);
};
