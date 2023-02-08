import RegistrationForm from "@/components/Molecules/RegistrationForm";
import { useRouter } from "next/router";
import { useWindowSize } from "../hooks";

const RegistrationPage = () => {
  const router = useRouter();
  const { height, width } = useWindowSize();

  const handleClickBack = () => {
    router.back();
  };

  return (
    <RegistrationForm
      onToggle={handleClickBack}
      height={height}
      width={width}
    />
  );
};

export default RegistrationPage;
