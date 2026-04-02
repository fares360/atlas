"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { TextAlign } from "@tiptap/extension-text-align";
import { 
  Bold, Italic, Underline as UnderlineIcon, 
  List, ListOrdered, Heading2, Heading3, Quote, 
  Undo, Redo, Image as ImageIcon, Link as LinkIcon,
  AlignLeft, AlignCenter, AlignRight, Palette
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TiptapEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("أدخل رابط الصورة (URL):");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-1 border-b bg-gray-50/50 p-2 rounded-t-lg" dir="ltr">
      
      {/* Undo / Redo */}
      <div className="flex items-center gap-1 mr-2 border-r pr-2">
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} icon={<Undo size={16} />} />
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} icon={<Redo size={16} />} />
      </div>

      {/* تنسيقات النص الأساسية */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
        icon={<Bold size={18} />}
        title="Bold"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
        icon={<Italic size={18} />}
        title="Italic"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive("underline")}
        icon={<UnderlineIcon size={18} />}
        title="Underline"
      />

      {/* اللون */}
      <div className="relative flex items-center justify-center w-8 h-8 mx-1">
        <label htmlFor="color-picker" className="cursor-pointer p-1.5 rounded hover:bg-gray-200 transition-colors">
            <Palette size={18} className={editor.getAttributes('textStyle').color ? "text-blue-600" : "text-gray-600"} />
        </label>
        <input
            id="color-picker"
            type="color"
            onInput={(event: any) => editor.chain().focus().setColor(event.target.value).run()}
            value={editor.getAttributes('textStyle').color || '#000000'}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            title="تغيير اللون"
        />
      </div>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* العناوين */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive("heading", { level: 2 })}
        icon={<Heading2 size={18} />}
        title="Heading 2"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive("heading", { level: 3 })}
        icon={<Heading3 size={18} />}
        title="Heading 3"
      />

      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* المحاذاة */}
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        isActive={editor.isActive({ textAlign: 'left' })}
        icon={<AlignLeft size={18} />}
        title="Align Left"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        isActive={editor.isActive({ textAlign: 'center' })}
        icon={<AlignCenter size={18} />}
        title="Align Center"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        isActive={editor.isActive({ textAlign: 'right' })}
        icon={<AlignRight size={18} />}
        title="Align Right"
      />

      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* القوائم */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
        icon={<List size={18} />}
        title="Bullet List"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
        icon={<ListOrdered size={18} />}
        title="Ordered List"
      />

      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* إضافات أخرى */}
      <ToolbarButton
        onClick={setLink}
        isActive={editor.isActive("link")}
        icon={<LinkIcon size={18} />}
        title="Add Link"
      />
      <ToolbarButton
        onClick={addImage}
        isActive={false}
        icon={<ImageIcon size={18} />}
        title="Add Image"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive("blockquote")}
        icon={<Quote size={18} />}
        title="Quote"
      />

    </div>
  );
};

const ToolbarButton = ({ onClick, isActive, icon, title }: any) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className={cn(
      "p-1.5 rounded-md transition-colors hover:bg-gray-200 text-gray-600",
      isActive && "bg-teal-100 text-teal-800 font-bold"
    )}
  >
    {icon}
  </button>
);

export default function TiptapEditor({ value, onChange, disabled }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline, // ✅ إضافة التسطير
      TextStyle, 
      Color,     // ✅ إضافة الألوان
      TextAlign.configure({ types: ['heading', 'paragraph'] }), // ✅ إضافة المحاذاة
      Image.configure({ inline: true }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "اكتب محتوى المقال هنا..." }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "prose prose-lg max-w-none focus:outline-none min-h-[300px] px-4 py-3 text-right dir-rtl",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editable: !disabled,
    immediatelyRender: false,
  });

  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm focus-within:ring-2 focus-within:ring-teal-500/20 transition-all">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}