import AtlasPartView from "@/components/atlas/AtlasPartView";

// ID المجلد الأول من ملف الـ SQL
const BOOK_ID = 'a0000001-0000-0000-0000-000000000001';

export default function Part1Page() {
  return <AtlasPartView bookId={BOOK_ID} partNumber={1} />;
}