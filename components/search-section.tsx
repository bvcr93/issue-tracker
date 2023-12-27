"use client";
import { Issue } from "@prisma/client";
import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import IssueTable from "./ui/issue-table";

interface SearchSectionProps {
  issues: Issue[];
}

export default function SearchSection({ issues }: SearchSectionProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>(issues);

  useEffect(() => {
    setFilteredIssues(issues);
  }, [issues]);

  const handleSearch = () => {
    const searchTerm = searchQuery.toLowerCase();

    const filtered = issues.filter(
      (issue) =>
        issue.title.toLowerCase().includes(searchTerm) ||
        issue.description.toLowerCase().includes(searchTerm)
    );

    setFilteredIssues(filtered);
  };

  return (
    <div className="">
      <Input
        className="w-full my-10"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          handleSearch(); 
        }}
      />
      {filteredIssues.map((iss) => (
        <IssueTable key={iss.id} {...iss} />
      ))}
    </div>
  );
}
