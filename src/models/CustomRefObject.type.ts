interface CustomRefObject {
  [inx: string]: React.RefObject<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
}

export default CustomRefObject;
