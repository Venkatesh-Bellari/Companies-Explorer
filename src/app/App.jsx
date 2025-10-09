'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { CompanyCard } from '@/components/company-card';
import { CompanyFilters } from '@/components/company-filters';
import { Pagination } from '@/components/pagination';
import { Frown, Loader, ServerCrash, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';



const ITEMS_PER_PAGE = 8;

const defaultFilters = {
  industry: 'all',
  location: 'all',
  minEmployees: 0,
};

export default function App() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState(defaultFilters);
  const [sortKey, setSortKey] = useState('name-asc');
  const [currentPage, setCurrentPage] = useState(1);
  
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/companies.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCompanies(data.companies || []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const industries = useMemo(
    () => {
      if(!Array.isArray(companies)) return [];
      return [...new Set(companies.map((c) => c.industry))].sort()
    },
    [companies]
  );
  const locations = useMemo(
    () => {
      if(!Array.isArray(companies)) return [];
      return [...new Set(companies.map((c) => c.location))].sort()
    },
    [companies]
  );

  const filteredAndSortedCompanies = useMemo(() => {
    if (!Array.isArray(companies)) return [];
    let filtered = companies.filter((company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filters.industry !== 'all') {
      filtered = filtered.filter((c) => c.industry === filters.industry);
    }
    if (filters.location !== 'all') {
      filtered = filtered.filter((c) => c.location === filters.location);
    }
    if (filters.minEmployees > 0) {
      filtered = filtered.filter((c) => c.employees >= filters.minEmployees);
    }

    filtered.sort((a, b) => {
      const [key, order] = sortKey.split('-');
      const valA = a[key];
      const valB = b[key];

      let comparison = 0;
      if (typeof valA === 'string' && typeof valB === 'string') {
        comparison = valA.localeCompare(valB);
      } else if (typeof valA === 'number' && typeof valB === 'number') {
        comparison = valA - valB;
      }

      return order === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [searchQuery, filters, sortKey, companies]);

  const totalPages = Math.ceil(
    filteredAndSortedCompanies.length / ITEMS_PER_PAGE
  );
  const paginatedCompanies = filteredAndSortedCompanies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSortChange = (key) => {
    setSortKey(key);
    setCurrentPage(1);
  };
  
  const resetAll = () => {
    setSearchQuery('');
    setFilters(defaultFilters);
    setSortKey('name-asc');
    setCurrentPage(1);
  };
  
  const handleScrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center text-center py-16 bg-card rounded-lg shadow-sm">
          <Loader className="mx-auto h-12 w-12 text-primary animate-spin" />
          <h3 className="mt-4 text-lg font-medium text-foreground">
            Loading Companies...
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Please wait a moment.
          </p>
        </div>
      );
    }

    if (error) {
       return (
        <div className="text-center py-16 bg-card rounded-lg shadow-sm border border-destructive/50">
          <ServerCrash className="mx-auto h-12 w-12 text-destructive" />
          <h3 className="mt-4 text-lg font-medium text-destructive">
            Failed to Load Data
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            There was an error fetching the company data. Please try again later.
          </p>
           <p className="mt-2 text-xs text-muted-foreground/80">Error: {error}</p>
        </div>
      );
    }
    
    if (paginatedCompanies.length > 0) {
      return (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedCompanies.map((company, index) => (
              <div
                key={company.id}
                className="animate-in fade-in slide-in-from-bottom-5 duration-500"
                style={{ animationDelay: `${index * 75}ms`, animationFillMode: 'backwards' }}
              >
                <CompanyCard company={company} />
              </div>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      );
    }

    return (
       <div className="text-center py-16 bg-card rounded-lg shadow-sm">
          <Frown className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium text-foreground">
            No Companies Found
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your search or filter criteria.
          </p>
        </div>
    );
  }

  return (
    <>
      <section className="relative flex h-screen flex-col items-center justify-center bg-background/50 text-center text-foreground">
        <img
          src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974&auto=format&fit=crop"
          alt="Team collaborating in an office"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-background" />
        <div className="relative z-10 mx-auto max-w-4xl p-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Explore and Filter Company Data
          </h1>
          <p className="mt-6 text-lg text-foreground/80 sm:text-xl">
            A React application designed to consume APIs and display company information with advanced filtering capabilities.
          </p>
          <Button size="lg" className="mt-8" onClick={handleScrollToContent}>
            Get Started
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <main ref={contentRef} className="container mx-auto px-4 py-8 md:py-16">
        <header className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Company Directory
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Search, filter, and sort to discover companies that match your interests.
          </p>
        </header>

        <CompanyFilters
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          filters={filters}
          onFilterChange={handleFilterChange}
          sortKey={sortKey}
          onSortChange={handleSortChange}
          industries={industries}
          locations={locations}
          onReset={resetAll}
        />

        {renderContent()}
      </main>
    </>
  );
}
