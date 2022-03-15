// Allow import file from './file.png';
declare module '*.png' {
  const content: any;
  export default content;
}