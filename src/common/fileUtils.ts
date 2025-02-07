export const convertFileToBase64 = (file: Blob): Promise<string> => new Promise((res, rej) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => res((reader.result as string).split(",")[1]);
    reader.onerror = rej;
});