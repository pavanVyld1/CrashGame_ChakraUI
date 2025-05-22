
import { Button, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BetButtonState, LABELS } from "../../types/projectTypes";

const PlaceBetButtonStateComponent = ({ index }: { index: number }) => {
  const [buttonState, setButtonState] = useState<BetButtonState>(BetButtonState.Idle);
  const [showPlaceBet, setShowPlaceBet] = useState(true);
  const [showCancelBet, setShowCancelBet] = useState(false);
  const [showCollect, setShowCollect] = useState(false);
  const amount = 100;

  const getBgColor = () => {
    switch (buttonState) {
      case BetButtonState.Idle: return 'yellow.500';
      case BetButtonState.WaitingForBet: return 'yellow.500';
      case BetButtonState.BetPlaced: return 'red.500';
      case BetButtonState.Disabled: return 'gray.500';
      case BetButtonState.Collect: return 'green.500';
      default: return 'yellow.500';
    }
  };

  const getBgHoverColor = () => {
    switch (buttonState) {
      case BetButtonState.Idle: return 'yellow.700';
      case BetButtonState.WaitingForBet: return 'yellow.700';
      case BetButtonState.BetPlaced: return 'red.700';
      case BetButtonState.Disabled: return 'gray.500';
      case BetButtonState.Collect: return 'green.700';
      default: return 'yellow.700';
    }
  };

  const OnPlaceBetClicked = () => {
    console.log("Place bet clicked");
    setButtonState(BetButtonState.BetPlaced);
    setShowPlaceBet(false);
    setShowCancelBet(true);
    setShowCollect(false);
  };

  const OnCancelClicked = () => {
    console.log("Cancel clicked");
    setButtonState(BetButtonState.Idle);
    setShowPlaceBet(true);
    setShowCancelBet(false);
    setShowCollect(false);
  };

  const OnCollectClicked = () => {
    console.log("Collect clicked");
    setButtonState(BetButtonState.Idle);
    setShowPlaceBet(true);
    setShowCancelBet(false);
    setShowCollect(false);
  };

  useEffect(() => {
    console.log("Component mounted");
    setShowPlaceBet(true);
    setShowCancelBet(false);
    setShowCollect(false);
  }, []);

  return (
    <Flex w="full" align="center" direction="column" gap={2}>
      {showPlaceBet && (
        <Button
          id="placebet"
          size="md"
          bg={getBgColor()}
          _hover={{ bg: getBgHoverColor() }}
          color="black"
          fontWeight="semibold"
          onClick={OnPlaceBetClicked}
        >
          {LABELS.PLACE_BET}
        </Button>
      )}

      {showCancelBet && (
        <Button
          id="cancelbet"
          size="md"
          bg={getBgColor()}
          _hover={{ bg: getBgHoverColor() }}
          color="black"
          fontWeight="semibold"
          onClick={OnCancelClicked}
        >
          {LABELS.CANCEL_BET}
        </Button>
      )}

      {showCollect && (
        <Button
          id="collectbet"
          size="md"
          bg={getBgColor()}
          _hover={{ bg: getBgHoverColor() }}
          color="black"
          fontWeight="semibold"
          onClick={OnCollectClicked}
        >
          {`${amount} $ - ${LABELS.COLLECT}`}
        </Button>
      )}
    </Flex>
  );
};

export default PlaceBetButtonStateComponent;
