/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';
import { data, resolveDomain } from '../../config';

const w = (w: number) => {
 return (w / 1600) * 100 + '%';
};

const h = (w: number) => {
 return (w / 836) * 100 + '%';
};

const Value = ({ value: v = '' }: { value: string }) => {
 let value = v;
 const maxLength = 5;
 if (value.length > maxLength) {
  console.warn(`value`);
 }
 return (
  <span
   style={{
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'SourceCodeVariable',
   }}
  >
   &lt;{value.slice(0, maxLength)}&gt;
  </span>
 );
};

const Label = ({ text, size }: { text: string; size?: string }) => {
 return (
  <span
   style={{
    color: 'rgb(86, 255, 151)',
    whiteSpace: 'nowrap',
    fontFamily: 'TTSquaresCondensed',
    fontSize: size || '30px',
   }}
  >
   {text}
  </span>
 );
};

const Element = ({
 gstEarned,
 gmtEarned,
 kms,
 hours,
 energyConsumed,
}: typeof data) => {
 return (
  <div
   style={{
    display: 'flex',
    position: 'relative',
    background: 'red',
    width: '100%',
    height: '100%',
    fontSize: 30,
   }}
  >
   <img src={resolveDomain('share.png')} alt="" />
   <div
    style={{
     display: 'flex',
     position: 'absolute',
     left: 0,
     top: 0,
     width: '100%',
     height: '100%',
    }}
   >
    <div
     style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      position: 'absolute',
      left: w(91.4),
      top: h(47.2),
      width: w(310),
     }}
    >
     <Value value={gstEarned} />
     <Label text="GST EARNED" />
    </div>
    <div
     style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      position: 'absolute',
      right: w(81.4),
      top: h(30),
      width: w(322),
     }}
    >
     <Value value={gmtEarned} />
     <Label text="GMT EARNED" />
    </div>
    <div
     style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      position: 'absolute',
      left: w(66.6),
      bottom: h(128),
      width: w(381),
     }}
    >
     <div style={{ display: 'flex', alignItems: 'center' }}>
      <Value value={kms} />
      <Label text="KMS" />
     </div>
     <div style={{ display: 'flex', alignItems: 'center' }}>
      <Value value={hours} />
      <Label text="HOURS" size="20px" />
     </div>
    </div>
    <div
     style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      position: 'absolute',
      right: w(48.1),
      bottom: h(87),
      width: w(334),
     }}
    >
     <Value value={energyConsumed} />
     <Label text="ENERGY" />
     <Label text="CONSUMED" />
    </div>
   </div>
  </div>
 );
};

const getFont = async (url: string) => {
 const res = await fetch(url);
 const buffer = await res.arrayBuffer();
 return Buffer.from(buffer);
};

export default async function handler(req: {
 nextUrl: { searchParams: URLSearchParams };
}) {
 const result: Partial<typeof data> = {};

 req.nextUrl.searchParams.forEach((value, key) => {
  result[key as unknown as keyof typeof data] = value || '0000';
 });

 return new ImageResponse(<Element {...(result as typeof data)} />, {
  width: 800,
  height: 418,
  fonts: [
   {
    name: 'TTSquaresCondensed',
    data: await getFont(resolveDomain('TTSquaresCondensed-BlackItalic.ttf')),
   },
   {
    name: 'SourceCodeVariable',
    data: await getFont(resolveDomain('SourceCodePro-Medium.ttf')),
   },
  ],
 });
}

export const config = {
 runtime: 'edge',
};
