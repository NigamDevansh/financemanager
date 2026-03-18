import { Layers2, Pencil } from "lucide-react";
import type { CategoryListProps } from "../types";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const CategoryList = ({ categories, onEditCategory }: CategoryListProps) => {
    return (
        <Card>
            <CardHeader className="flex items-center justify-between pb-4">
                <CardTitle className="text-lg font-semibold">Category Sources</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Category list */}
                {categories.length === 0 ? (
                    <p className="text-muted-foreground text-sm">
                        No categories added yet. Add some to get started!
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className="group relative flex items-center gap-4 p-4 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                                {/* Icon/Emoji disply*/}
                                <div className="w-12 h-12 flex items-center justify-center text-xl bg-muted rounded-full">
                                    {category.icon ? (
                                        <span className="text-2xl flex items-center justify-center">
                                            <img src={category.icon} alt={category.name} className="h-6 w-6 object-contain" />
                                        </span>
                                    ) : (
                                        <Layers2 className="text-primary" size={24} />
                                    )}
                                </div>

                                {/* Category Details*/}
                                <div className="flex-1 flex items-center justify-between min-w-0">
                                    {/* Category name and type*/}
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium truncate">
                                            {category.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-0.5 capitalize">
                                            {category.type}
                                        </p>
                                    </div>
                                    {/* Action buttons*/}
                                    <div className="flex items-center gap-2 pl-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onEditCategory(category)}
                                            className="h-8 w-8 text-muted-foreground hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Pencil size={15} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export default CategoryList;
