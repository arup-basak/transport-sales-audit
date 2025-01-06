import DropFile from "@/modules/Upload/DropFile";
import DeleteEntireTimeline from "@/modules/Buttons/DeleteEntireTimeline";
import Export from "@/modules/Buttons/Export";

const Page = () => {
  return (
    <main className="p-8 space-y-4">
      <section className="control flex gap-2">
        <DeleteEntireTimeline />
        <Export />
      </section>
      <DropFile />
    </main>
  );
};

export default Page;
