// src/components/Header.tsx
import { Button, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { LABELS } from '../../types/projectTypes';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [wallet, setWallet] = useState<number>(0);

  const OnLogoutClicked = ()=>{
    console.log("Logout is clicked");
    localStorage.clear();
    // const data =  GameCanvas();
    // console.log("Placebet is clicked " + data);
    navigate("/");
  }

  useEffect(() => {
    const loadWallet = () => {
      const userString = localStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        setWallet(user.wallet || 0);
      }
    };

    loadWallet();

    // Optional: Listen to custom wallet update events
    window.addEventListener('walletUpdated', loadWallet);

    return () => {
      window.removeEventListener('walletUpdated', loadWallet);
    };
  }, []);

  const formatINR = (amount: number) =>
    amount.toLocaleString('en-IN', { minimumFractionDigits: 2 });

  return (
    <Flex justify="space-between" align="center" p="4" bg="gray.900" borderBottom="1px solid #2d3748">
      <Text fontSize="xl" fontWeight="bold" color="red.400">{LABELS.GAME_LABEL}</Text>
      <Flex align={"end"} gap={4}>
        <Text fontWeight="bold" color="green.300">{formatINR(wallet)} INR</Text>
          <Button
            id="logout"
            minW={'full'}
            size={{ base: "xs", sm: "sm", md: "md" , lg: "md", xl: "md"}}
            color={"black"}
            fontSize={{ base: "xs", sm: "sm", md: "md" , lg: "lg", xl: "lg"}}
            fontWeight="semibold"
            // display={'none'} 
          // margin={0}
            onClick={ ()=> {
                OnLogoutClicked();
            } 
          }>
          {LABELS.LOGOUT}
          </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
