
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Building2, Calendar, MapPin, Users, Link as LinkIcon } from 'lucide-react';
import { Badge } from './ui/badge';
import Link from 'next/link';

export function CompanyCard({ company }) {
  const logoUrl = `https://picsum.photos/seed/${company.name}/100/100`;

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/50 dark:hover:shadow-primary/20 hover:-translate-y-1">
      <CardHeader className="flex flex-row items-start gap-4">
        <div className="relative h-16 w-16 flex-shrink-0">
          <img
            src={logoUrl}
            alt={`${company.name} logo`}
            width={64}
            height={64}
            className="rounded-lg border bg-card object-cover"
          />
        </div>
        <div className="flex-1">
          <CardTitle className="font-headline text-xl">{company.name}</CardTitle>
          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="h-4 w-4 flex-shrink-0" />
            <Badge variant="secondary">{company.industry}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <p className="text-sm text-foreground/80">{company.description}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2" title="Location">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span>{company.location}</span>
          </div>
          <div className="flex items-center gap-2" title="Founded Year">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span>{company.foundedYear}</span>
          </div>
          <div className="flex items-center gap-2" title="Employees">
            <Users className="h-4 w-4 flex-shrink-0" />
            <span>{company.employees.toLocaleString()}</span>
          </div>
        </div>
        {company.website && (
            <Link
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <LinkIcon className="h-4 w-4" />
              Visit Website
            </Link>
          )}
      </CardContent>
    </Card>
  );
}
