use strict; use warnings; local $/ = undef;
my $path = $ARGV; my $relp = ($path =~ m{^src/pages/[^/]+\.astro$}) ? '../layouts' : '../../layouts';
$_ = <>;

if ($_ =~ /\A---\n/s) {
  my ($head,$rest) = ($_ =~ /\A---\n([\s\S]*?)\n---\n?([\s\S]*)\z/s);
  $head //= ''; $rest //= '';

  $head =~ s/^\s*layout\s*:\s*[^\n]+\n//mg;
  $head =~ s/^\s*import\s+Base\s+from\s+["\'][^"\']*\/Base\.astro["\'];?\s*\n//mg;
  $head = qq{import Base from "$relp/Base.astro";\n} . $head;

  $_ = "---\n$head---\n$rest";
}

$_ =~ /<Base\b/ or do {
  s/\A(---[\s\S]*?---\s*)/\1<Base>\n/s or $_ = "<Base>\n" . $_;
  $_ .= "\n</Base>\n" unless $_ =~ /<\/Base>\s*\z/;
};

print $_;
