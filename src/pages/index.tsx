'use client'
import Image from 'next/image'
import Head from 'next/head'
import { data as defaultData, resolveDomain } from '../config'
import { GetServerSideProps } from 'next'
import { stringify } from 'querystring'

const twitter = new URL('intent/tweet', 'https://twitter.com');
twitter.searchParams.set('text', `One more year with #STEPN! 🥳
Here are some of my achievements from the #STEPNRecap2023 (click the image for even more) 👇
`);

const Counter = ({ filed, value, className }: { filed: string, value: string, className?: string }) => {
  const maxLength = 5;
  if (filed && value.length > maxLength) {
    console.warn(`${filed}=${value}`)
  }
  return <span className={`text-[5vw] ${className ? className : ''} font-['SourceCodeVariable']`}>&lt;{value.slice(0, maxLength)}&gt;</span>
}

type Data = typeof defaultData;

interface HomeProps {
  initialData: Data;
}

export default function Home({ initialData }: HomeProps) {
  const data = { ...defaultData, ...initialData };

  const twitterImageUrl = resolveDomain(`api/report?t=${Date.now()}`);
  const shareTwitterInstance = new URL(twitterImageUrl);

  for (const key in data) {
    const k = key as keyof typeof data;
    shareTwitterInstance.searchParams.set(key, data[k]);
  }

  const shareTwitterURL = shareTwitterInstance.toString();
  twitter.searchParams.set('url', resolveDomain('?' + stringify(data)))

  const link = {
    download: 'https://google.cn',
    shareTwitter: twitter.toString()
  }

  return <div>
    <Head>
      <title>Stepn Report</title>
      <meta name="twitter:site" content="@Stepnofficial" />
      <meta name="twitter:creator" content="@Stepnofficial" />
      <meta property="og:url" content={shareTwitterURL} />
      <meta property="og:title" content="Stepn Report" />
      <meta property="og:image" content={shareTwitterURL} />
      <meta content="summary_large_image" name="twitter:card" />
    </Head>
    <div className='fixed w-full h-full left-0 top-0 bg-[#2e2e2e] overflow-auto font-source'>
      <Image
        src="/bg.png"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
        alt=''
      />
      <div className='absolute left-0 top-0 w-full h-full text-white'>
        <div className='flex justify-center items-end w-full h-[14vw]'>
          <a href={link.download} className='w-[26%] h-[36%] mr-12'></a>
          <a href={link.shareTwitter} className='w-[26%] h-[36%]'></a>
        </div>
        <div className='flex justify-center items-end w-full h-[16vw]'>
          <Counter filed='fusions' value={data.fusions} />
        </div>
        <div className='flex justify-center items-end w-full h-[19vw]'>
          <Counter filed='enhancements' value={data.enhancements} />
        </div>
        <div className='flex justify-center items-end w-full h-[18vw]'>
          <Counter filed='mints' value={data.mints} />
        </div>
        <div className='flex justify-center items-end w-full h-[22vw]'>
          <Counter filed='gstEarned' value={data.gstEarned} className='mr-[16vw]' />
          <Counter filed='gmtEarned' value={data.gmtEarned} />
        </div>
        <div className='flex justify-center items-end w-full h-[99vw]'>
          <Counter filed='kms' value={data.kms} className='mr-[28vw]' />
          <Counter filed='energyConsumed' value={data.energyConsumed} />
        </div>
        <div className='flex justify-center items-end w-full h-[7vw]'>
          <Counter filed='hours' value={data.hours} className='translate-x-[-28vw]' />
          <Counter filed='' className='hidden' value={'0000000000000'} />
        </div>
        <div className='flex justify-center items-end w-full h-[31vw]'>
          <Counter filed='gemUpgrades' value={data.gemUpgrades} className='mr-[26vw]' />
          <Counter filed='activeDays' value={data.activeDays} />
        </div>
        <div className='flex justify-center items-end w-full h-[27vw]'>
          <Counter filed='badgesClaimed' value={data.badgesClaimed} className='mr-[26vw]' />
          <Counter filed='achievementPointsEarned' value={data.achievementPointsEarned} />
        </div>
      </div>
    </div >
  </div >
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const initialData: Partial<Data> = {};
  for (const key in defaultData) {
    if (key in query) {
      initialData[key as keyof Data] = query[key] as string;
    }
  }
  return { props: { initialData } };
};

export const runtime = 'experimental-edge';
