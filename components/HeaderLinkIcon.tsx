interface HeaderLinkIconProps {
  icon: any;
  label: string;
}

function HeaderLinkIcon({ icon: Icon, label }: HeaderLinkIconProps) {
  return (
    <div className="flex items-center">
      <Icon className="h-5 mx-1" />
      {label}
    </div>
  );
}

export default HeaderLinkIcon;
