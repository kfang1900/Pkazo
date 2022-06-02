import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import useAuth from 'utils/useAuth';
import styles from '../styles/Home.module.css';
import Header from '../components/Header';
import 'twin.macro';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  RefinementList,
  SearchBox,
  Hits,
  useSearchBox,
} from 'react-instantsearch-hooks-web';

const searchClient = algoliasearch(
  'C7MS0BD8WG',
  '6a66c7b3a0c0cf3d52edb60146226383'
);
function Hit({ hit }: {
  hit: Record<string, any>
}) {
  return (
    <a href={`/work/${hit.id}`}>
      <div tw={'text-gray-900 hover:bg-gray-300 cursor-pointer underline'}>
        <b>{hit.title}</b> <br />
        {hit.description}
      </div>
    </a>
  );
}
// function Search() {
//   const { query, refine, clear, isSearchStalled } = useSearchBox();
//
//   return (
//     <>
//       <input
//         tw={
//           'border border-[#D8D8D8] rounded-[6px] px-[16px] text-[16px] w-full h-[40px]'
//         }
//         value={query}
//         onChange={(e) => refine(e.target.value)}
//       />
//     </>
//   );
// }
const SearchPage: NextPage = () => {
  const auth = useAuth();

  return (
    <>
      <Header />
      <div className={styles.container}>
        <Head>
          <title>Pkazo</title>
          <meta name="description" content="" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div tw={'w-full'}>
          <h1 tw={'text-3xl mx-auto mt-8 mx-20 font-bold text-center'}>
            Search
          </h1>
          <InstantSearch searchClient={searchClient} indexName="pkazo-works">

            <SearchBox /><RefinementList attribute="medium" />
            <Hits hitComponent={Hit} />
          </InstantSearch>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
