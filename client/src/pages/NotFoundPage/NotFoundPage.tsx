import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center px-6">
        {/* 大数字 */}
        <div className="font-serif text-[12rem] md:text-[16rem] leading-none text-brand/10 select-none">
          404
        </div>

        {/* 内容 */}
        <div className="-mt-8 md:-mt-12 relative z-10">
          <h1 className="font-serif text-3xl md:text-4xl font-medium mb-4">
            页面未找到
          </h1>
          <p className="text-muted-foreground font-light max-w-md mx-auto mb-8">
            抱歉，您访问的页面不存在或已被移除。
            让我们回到首页继续探索吧。
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-medium hover:bg-brand transition-colors rounded-full"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
