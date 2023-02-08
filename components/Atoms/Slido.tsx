import { RootState } from "@/states/store";
import { FC, Fragment } from "react";
import { useSelector } from "react-redux";

interface TSlidoProps {
  id: string;
}

const Slido: FC<TSlidoProps> = ({ id }) => {
  const { firstName, lastName } = useSelector((state: RootState) => state.user);

  return (
    <Fragment>
      {id !== undefined && (
        <iframe
          title="APCCA 2022"
          // https://app.sli.do/event/
          src={`${id}?user_name=${encodeURI(firstName + " " + lastName)}`}
          style={{ width: "100%", height: "100%" }}
        />
      )}
    </Fragment>
  );
};

export default Slido;
