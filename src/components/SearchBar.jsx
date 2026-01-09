import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function SearchBar({ onSearch, isLoading }) {
  const [skill, setSkill] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (skill.trim()) {
      onSearch(skill.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Enter a skill (e.g., React, Python, Machine Learning)"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className="pl-10"
            disabled={isLoading}
          />
        </div>
        <Button 
          type="submit" 
          disabled={!skill.trim() || isLoading}
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              <span>Searching...</span>
            </>
          ) : (
            <span>Search</span>
          )}
        </Button>
      </div>
    </form>
  );
}
