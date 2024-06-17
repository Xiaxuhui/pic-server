/* eslint-disable @next/next/no-img-element */
import { resolveDomain } from '@/config';
import { ImageResponse } from 'next/og';

interface ICardProps {
 value: '20' | '50' | '100' | '200';
 code: string;
 deadline: string;
}

const Card: React.FC<ICardProps> = ({ value, code, deadline }) => {
 return (
  <div
   style={{
    display: 'flex',
    position: 'relative',
    background: 'transparent',
    fontFamily: 'RoobertRegular',
    width: '100%',
    height: '100%',
   }}
  >
   <img tw="w-full h-full" src={resolveDomain(`${value}.png`)} alt="" />
   <div tw="text-bold text-[#fff] text-[34px] absolute bottom-[90px] left-[75px]">
    {formatAddress(code, 3)}
   </div>
   <div tw="text-bold text-[#fff] text-[20px] absolute bottom-[55px] left-[180px]">
    {getTimeString(+deadline)}
   </div>
  </div>
 );
};

export default async function handler(req: {
 nextUrl: { searchParams: URLSearchParams };
}) {
 const result = {} as ICardProps;

 req.nextUrl.searchParams.forEach((value, key) => {
  result[key as keyof ICardProps] = value as any;
 });
 return new ImageResponse(<Card {...result} />, {
  width: 600,
  height: 400,
  fonts: [
   {
    name: 'RoobertRegular',
    data: await getFont(resolveDomain('RoobertRegular.ttf')),
   },
  ],
 });
}

const getFont = async (url: string) => {
 const res = await fetch(url);
 const buffer = await res.arrayBuffer();
 return Buffer.from(buffer);
};

const formatAddress = (address: string | undefined, pos?: number) => {
 if (!address) {
  return '';
 }
 const posNum = pos || 4;
 const fp = address.slice(0, posNum);
 const lp = address.slice(-posNum);
 return `${fp}...${lp}`;
};

const getTimeString = (time: number) => {
 if (!time) {
  return '';
 }
 const [_, month, date, year] = new Date(time).toString().split(' ');
 return `${date} ${month} ${year}`;
};

export const config = {
 runtime: 'edge',
};
