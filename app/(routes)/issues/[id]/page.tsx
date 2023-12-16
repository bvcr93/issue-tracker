
interface IssueDetailsProps {
  params: {
    id: string;
  };
}
export default function IssueDetailsPage({
  params: { id },
}: IssueDetailsProps) {
  return <div>IssueDetailsPage {id}</div>;
}
