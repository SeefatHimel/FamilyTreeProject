import { useEffect, useState } from "react";
import { getLocalStorage } from "../../storage/storage";
import { GetFamilyDetails } from "../../APIs/familyApis";

const FamilyList = () => {
  const [families, setFamilies] = useState<any>([]);
  const getFamilies = async () => {
    const familyList = getLocalStorage("familyList");
    console.log(
      "🚀 ~ file: index.tsx:10 ~ getFamilies ~ familyList:",
      familyList
    );
    const tmp: any = families;
    await familyList.forEach(async (familyId: string) => {
      const fTmp = await GetFamilyDetails(familyId);
      console.log("🚀 ~ file: index.tsx:17 ~ familyList.forEach ~ fTmp:", fTmp);
      tmp.push({ id: familyId, name: fTmp.name });
      console.log("🚀 ~ file: index.tsx:19 ~ familyList.forEach ~ tmp:", tmp);
      if (tmp?.length > 0) setFamilies(tmp);
    });
    console.log("🚀 ~ file: index.tsx:17 ~ getFamilies ~ tmp:", tmp);
  };
  useEffect(() => {
    getFamilies();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {}, [families]);

  console.log("🚀 ~ file: index.tsx:34 ~ FamilyList ~ families:", families);

  return (
    <div className="flex flex-col w-[400px] mx-auto gap-4 pt-5">
      {/* <div className="font-semibold text-lg">Families</div>d */}
      {families && (
        <>
          d
          {families.map((fam: any) => (
            <div>Name : {fam.name}</div>
          ))}
        </>
      )}
    </div>
  );
};

export default FamilyList;
