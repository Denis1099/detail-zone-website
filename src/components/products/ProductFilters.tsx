
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, X } from "lucide-react";
import { useState } from "react";

interface ProductFiltersProps {
  onFilter: (filters: FilterOptions) => void;
  categories: string[];
}

export interface FilterOptions {
  search: string;
  category: string;
  onlyDiscount: boolean;
  onlyRecommended: boolean;
}

export function ProductFilters({ onFilter, categories }: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    category: "",
    onlyDiscount: false,
    onlyRecommended: false
  });

  const handleChange = (name: keyof FilterOptions, value: string | boolean) => {
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      search: "",
      category: "",
      onlyDiscount: false,
      onlyRecommended: false
    };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <div className="bg-card border rounded-lg p-5 mb-8">
      <h3 className="text-lg font-medium mb-4">סינון מוצרים</h3>
      
      <div className="space-y-4">
        <div className="relative">
          <Input
            placeholder="חיפוש מוצרים..."
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
            className="pr-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        
        <div>
          <Label htmlFor="category">קטגוריה</Label>
          <Select 
            value={filters.category} 
            onValueChange={(value) => handleChange("category", value)}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="כל הקטגוריות" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">כל הקטגוריות</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2 space-x-reverse">
          <Checkbox 
            id="onlyDiscount" 
            checked={filters.onlyDiscount}
            onCheckedChange={(checked) => handleChange("onlyDiscount", checked === true)}
          />
          <Label htmlFor="onlyDiscount">הצג רק מוצרים בהנחה</Label>
        </div>
        
        <div className="flex items-center space-x-2 space-x-reverse">
          <Checkbox 
            id="onlyRecommended" 
            checked={filters.onlyRecommended}
            onCheckedChange={(checked) => handleChange("onlyRecommended", checked === true)}
          />
          <Label htmlFor="onlyRecommended">הצג רק מוצרים מומלצים</Label>
        </div>
        
        <Button variant="outline" className="w-full" onClick={handleReset}>
          <X className="ml-2 h-4 w-4" />
          איפוס סינון
        </Button>
      </div>
    </div>
  );
}
