import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/db";

export default async function DashboardPage() {
  const appCount = await prisma.app.count();
  const categoryCount = await prisma.category.count();
  
  const stats = [
    { title: "Total Apps", value: appCount },
    { title: "Categories", value: categoryCount },
    { title: "Active Users", value: 1 }, // Mock
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((s) => (
          <Card key={s.title} className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-slate-400 text-sm">{s.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-50">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
