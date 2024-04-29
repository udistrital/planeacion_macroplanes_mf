export type DocumentRequest = {
  'uid:uid': any;
  'uid:major_version': number;
  'uid:minor_version': number;
  'thumb:thumbnail': FileContent;
  'file:content': FileContent;
  'common:icon-expanded': any;
  'common:icon': string;
  'files:files': any[];
  'dc:description': any;
  'dc:language': any;
  'dc:coverage': any;
  'dc:valid': any;
  'dc:creator': string;
  'dc:modified': string;
  'dc:lastContributor': string;
  'dc:rights': any;
  'dc:expired': any;
  'dc:format': any;
  'dc:created': string;
  'dc:title': string;
  'dc:issued': any;
  'dc:nature': any;
  'dc:subjects': any[];
  'dc:contributors': string[];
  'dc:source': any;
  'dc:publisher': any;
  'relatedtext:relatedtextresources': any[];
  'nxtag:tags': any[];
  file: string;
};

export type FileContent = {
  name: string;
  'mime-type': string;
  encoding: any;
  digestAlgorithm: string;
  digest: string;
  length: string;
  data: string;
};
export type Documento = {
  name: string;
  size: string;
  type: string;
  uid: string;
  file: string;
};
