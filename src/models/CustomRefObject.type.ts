interface CustomRefObject {
  [inx: string]: React.RefObject<
    HTMLFormElement | HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;
}

export default CustomRefObject;
