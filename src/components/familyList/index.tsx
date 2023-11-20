import { useEffect, useState } from "react";

import { GetFamilyDetails, GetFamilyList } from "../../APIs/familyApis";

const FamilyList = () => {
  const [families, setFamilies] = useState<any>([]);
  const getFamilies = async () => {
    const tmp: any = families;
    await families?.forEach(async (family: any) => {
      console.log(
        "🚀 ~ file: index.tsx:10 ~ await families?.forEach ~ family:",
        family
      );
      tmp.push({ id: family.id, name: family.name });
    });
    if (tmp?.length > 0) setFamilies(tmp);
    console.log("🚀 ~ file: index.tsx:17 ~ getFamilies ~ tmp:", tmp);
  };
  const getFamilyList = async () => {
    const res = await GetFamilyList();
    console.log("🚀 ~ file: index.tsx:26 ~ getFamilyList ~ res:", res);
    if (res?.length > 0) setFamilies(res);
  };
  useEffect(() => {
    getFamilyList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getFamilies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [families]);

  console.log("🚀 ~ file: index.tsx:34 ~ FamilyList ~ families:", families);

  return (
    <div className="flex flex-col w-[400px] mx-auto gap-4 pt-5">
      {/* <div className="font-semibold text-lg">Families</div>d */}
      {families && (
        <>
          {families.map((fam: any) => (
            <div>Name : {fam?.name}</div>
          ))}
        </>
      )}
    </div>
  );
};

export default FamilyList;
