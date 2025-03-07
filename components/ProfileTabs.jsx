import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const ProfileTabs = ({ tabConfig, activeTab }) => {
  console.log(tabConfig, activeTab);
  return (
    <ToggleGroup
      className="flex bg-white mt-8 border-b-[1px] border-gray-300 w-full"
      type="single"
    >
      {tabConfig.map(({ label, action }) => (
        <ToggleGroupItem
          key={label}
          onClick={action}
          className={`relative text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-none 
            after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px]
            after:bg-black after:transition-all after:duration-300 
            ${activeTab === label ? "after:scale-x-100" : "after:scale-x-0"}
          `}
        >
          {label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default ProfileTabs;
