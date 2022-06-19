import { useEffect, useState } from 'react';
import projectConfig from '../config/projectConfig';
import { MINTINGS } from '../contracts/testMinting';
import { getNFTTokenIdsForContract, getNFTExternalMetadataForContract } from '../utils/covalent'

export default function TokenList() {

  const [list, setList] = useState([]);
  
  useEffect(() => {
    const fetch = async () => {
      const contractAddr = projectConfig.contractAddress
      const tokenIds = await getNFTTokenIdsForContract(contractAddr)
      console.log(tokenIds)
      setList(tokenIds.data.items);
      // const tokenLength = tokenIds.data.items.length;
      // for (let i=0; i<tokenLength; i++) {
      //   const metadata = await getNFTExternalMetadataForContract(contractAddr, i.toString());
      //   console.log('m', metadata)
      // }
    }

    fetch()
  }, []);

  return (
    <>
      <h2 className="text-4xl mb-4">NFT List</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-4">
          {list.length > 0 && list.map((item: any) => {
            return (
              <div key={item.token_id}>
                <img src={MINTINGS[parseInt(item.token_id.toString())].image} width={250} />
                <p>{MINTINGS[parseInt(item.token_id.toString())].description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </>
  );
}
