import { useMoveBack } from "../hooks/useMoveBack";

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <>
      <h1>The page you are looking for could not be found 😢</h1>
      <button onClick={moveBack}>&larr; Go back</button>
    </>
  );
}

export default PageNotFound;
