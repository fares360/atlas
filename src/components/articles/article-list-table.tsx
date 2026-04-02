"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { 
  Edit, 
  Trash2, 
  Eye, 
  Loader2 
} from "lucide-react";
import { toast } from "sonner";
import { deleteArticle } from "@/app/actions/article-actions";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// ✅ التأكد من المسار الصحيح للمكون
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ArticleListTableProps {
  articles: any[];
}

export default function ArticleListTable({ articles }: ArticleListTableProps) {
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setDeletingId(id);
    startTransition(async () => {
      const result = await deleteArticle(id);
      if (result.success) {
        toast.success("تم حذف المقال بنجاح");
      } else {
        toast.error(result.error || "حدث خطأ أثناء الحذف");
      }
      setDeletingId(null);
    });
  };

  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        لا توجد مقالات حتى الآن.
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">عنوان المقال</TableHead>
          <TableHead className="text-right">الحالة</TableHead>
          <TableHead className="text-right">التاريخ</TableHead>
          <TableHead className="text-center">إجراءات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {articles.map((article) => (
          <TableRow key={article.id}>
            <TableCell className="font-medium">
              <div className="flex flex-col">
                <span className="text-[#2A5B68] font-bold line-clamp-1">
                  {article.title}
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  /{article.slug}
                </span>
              </div>
            </TableCell>
            
            <TableCell>
              <Badge 
                variant={article.is_published ? "default" : "secondary"}
                className={article.is_published ? "bg-green-600 hover:bg-green-700" : "bg-gray-400"}
              >
                {article.is_published ? "منشور" : "مسودة"}
              </Badge>
            </TableCell>

            <TableCell className="text-gray-500 text-sm">
              {format(new Date(article.created_at), "dd MMM yyyy", { locale: ar })}
            </TableCell>

            <TableCell>
              <div className="flex items-center justify-center gap-2">
                
                {/* Delete Button */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50">
                      {deletingId === article.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
                      <AlertDialogDescription>
                        سيتم حذف المقال نهائياً. لا يمكن التراجع عن هذا الإجراء.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>إلغاء</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => handleDelete(article.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        حذف
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                {/* Edit Button */}
                <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-amber-600 hover:text-amber-700 hover:bg-amber-50">
                  <Link href={`/admin/articles/${article.id}`}>
                    <Edit className="w-4 h-4" />
                  </Link>
                </Button>

                {/* View Button */}
                <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                  <Link href={`/articles/${article.slug}`} target="_blank">
                    <Eye className="w-4 h-4" />
                  </Link>
                </Button>

              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}