export default function IntroductionPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="w-[100vw] p:h-[30vh] d:h-[700px] bg-center bg-[url(https://firebasestorage.googleapis.com/v0/b/xedapdiencantho.appspot.com/o/DANH%20THI%E1%BA%BEP%20KEN%20EBIKE.jpg?alt=media&token=fc253a3e-8e98-459b-911f-381ced6d2f11)] bg-no-repeat bg-contain">
        <div className="w-full h-full bg-[rgba(0,0,0,0.16)]"></div>
      </div>
      {children}
    </>
  );
}
