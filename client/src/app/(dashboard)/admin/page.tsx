import DropCSV from "@/modules/Upload/DropCSV";
import DeleteEntireTimeline from "@/modules/Buttons/DeleteEntireTimeline";

const Page = () => {
  return (
    <main className="p-8 space-y-4">
      <section className="control-buttons">
        <DeleteEntireTimeline />
      </section>
      <DropCSV />
    </main>
  );
};

export default Page;
