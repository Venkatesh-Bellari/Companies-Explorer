
'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, XCircle } from 'lucide-react';
import { Button } from './ui/button';

export function CompanyFilters({
  searchQuery,
  onSearchChange,
  filters,
  onFilterChange,
  sortKey,
  onSortChange,
  industries,
  locations,
  onReset
}) {
  
  const handleMinEmployeesChange = (e) => {
    const value = e.target.valueAsNumber;
    onFilterChange({ ...filters, minEmployees: isNaN(value) ? 0 : value });
  };
  
  return (
    <div className="mb-8 rounded-lg border bg-card p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <div className="xl:col-span-2">
          <label
            htmlFor="search"
            className="mb-2 block text-sm font-medium text-muted-foreground"
          >
            Search by name
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="search"
              placeholder="e.g. Innovatech Solutions"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="industry-filter"
            className="mb-2 block text-sm font-medium text-muted-foreground"
          >
            Industry
          </label>
          <Select
            value={filters.industry}
            onValueChange={(value) => onFilterChange({ ...filters, industry: value })}
          >
            <SelectTrigger id="industry-filter" className="w-full">
              <SelectValue placeholder="Filter by industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label
            htmlFor="location-filter"
            className="mb-2 block text-sm font-medium text-muted-foreground"
          >
            Location
          </label>          <Select
            value={filters.location}
            onValueChange={(value) => onFilterChange({ ...filters, location: value })}
          >
            <SelectTrigger id="location-filter" className="w-full">
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
         <div>
          <label
            htmlFor="min-employees"
            className="mb-2 block text-sm font-medium text-muted-foreground"
          >
            Min. Employees
          </label>
           <Input
              id="min-employees"
              type="number"
              placeholder="e.g. 100"
              value={filters.minEmployees || ''}
              onChange={handleMinEmployeesChange}
              min="0"
            />
        </div>
        <div className="grid grid-cols-2 gap-4 md:col-span-2 lg:col-span-1 xl:col-span-1">
          <div className="flex items-end">
             <Button variant="outline" className="w-full" onClick={onReset}>
               <XCircle className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
          <div className="flex items-end">
            <Select
              value={sortKey}
              onValueChange={(value) => onSortChange(value)}
            >
              <SelectTrigger id="sort-order" className="w-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="employees-desc">Employees (High-Low)</SelectItem>
                <SelectItem value="employees-asc">Employees (Low-High)</SelectItem>
                <SelectItem value="foundedYear-desc">Founded (New-Old)</SelectItem>
                <SelectItem value="foundedYear-asc">Founded (Old-New)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
